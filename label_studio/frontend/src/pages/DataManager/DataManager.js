import { useCallback, useEffect, useRef, useState } from 'react';
import { generatePath, useHistory } from 'react-router';
import { Button } from '../../components/Button/Button';
import { modal } from '../../components/Modal/Modal';
import { ProjectMenu } from '../../components/ProjectMenu/ProjectMenu';
import { useLibrary } from '../../providers/LibraryProvider';
import { useProject } from '../../providers/ProjectProvider';
import { useContextProps, useParams } from '../../providers/RoutesProvider';
import { Block, Elem } from '../../utils/bem';
import { isDefined } from '../../utils/helpers';
import { ImportModal } from '../CreateProject/Import/ImportModal';
import { ExportPage } from '../ExportPage/ExportPage';
import { APIConfig } from './api-config';
import "./DataManager.styl";

const initializeDataManager = async (root, props, params) => {
  if (!window.LabelStudio) throw Error("Label Studio Frontend doesn't exist on the page");
  if (!root && root.dataset.dmInitialized) return;

  root.dataset.dmInitialized = true;

  const { ...settings } = root.dataset;

  const dmConfig = {
    root,
    projectId: params.id,
    apiGateway: `${window.APP_SETTINGS.hostname}/api/dm`,
    apiVersion: 2,
    polling: !window.APP_SETTINGS,
    showPreviews: false,
    apiEndpoints: APIConfig.endpoints,
    interfaces: {
      import: false,
      export: false,
      backButton: false,
      labelingHeader: false,
    },
    ...props,
    ...settings,
  };

  return new window.DataManager(dmConfig);
};

const buildLink = (path, params) => {
  return generatePath(`/projects/:id${path}`, params);
};

export const DataManagerPage = ({ ...props }) => {
  const root = useRef();
  const params = useParams();
  const history = useHistory();
  const LabelStudio = useLibrary('lsf');
  const DataManager = useLibrary('dm');
  const setContextProps = useContextProps();
  const [ crashed, setCrashed ] = useState(false);
  const dataManagerRef = useRef();

  const init = useCallback(async () => {
    if (!LabelStudio) return;
    if (!DataManager) return;
    if (!root.current) return;
    if (dataManagerRef.current) return;

    dataManagerRef.current = dataManagerRef.current ?? await initializeDataManager(
      root.current,
      props,
      params,
    );

    const { current: dataManager } = dataManagerRef;

    dataManager.on("crash", () => setCrashed());

    dataManager.on("settingsClicked", () => {
      history.push(buildLink("/settings/labeling", { id: params.id }));
    });

    dataManager.on("importClicked", () => {
      history.push(buildLink("/data/import", { id: params.id }));
    });

    dataManager.on("exportClicked", () => {
      history.push(buildLink("/data/export", { id: params.id }));
    });

    setContextProps({ dmRef: dataManager });
  }, [ LabelStudio, DataManager ]);

  const destroyDM = useCallback(() => {
    if (dataManagerRef.current) {
      dataManagerRef.current.destroy();
      dataManagerRef.current = null;
    }
  }, [ dataManagerRef ]);

  useEffect(() => {
    init();

    return () => destroyDM();
  }, [ root, init ]);

  return crashed ? (
    <Block name="crash">
      <Elem name="info">Project was deleted or not yet created</Elem>

      <Button to="/projects">
        Back to projects
      </Button>
    </Block>
  ) : (
    <Block ref={root} name="datamanager"/>
  );
};

DataManagerPage.path = "/data";
DataManagerPage.pages = {
  ExportPage,
  ImportModal,
};
DataManagerPage.context = () => {
  const params = useParams();
  const { project } = useProject();

  const showLabelingInstruction = useCallback((mode) => {
    const isLabelStream = mode === 'labeling';
    const { expert_instruction, show_instruction } = project;

    if (isLabelStream && show_instruction && expert_instruction) {
      modal({
        title: "Labeling Instructions",
        body: <div dangerouslySetInnerHTML={{ __html: expert_instruction }}/>,
        style: { width: 680 },
      });
    }
  }, [ project ]);

  const onDMModeChanged = useCallback((mode) => {
    showLabelingInstruction(mode);
  }, [ showLabelingInstruction ]);

  useEffect(() => {
    if (isDefined(params.mode)) {
      onDMModeChanged(params.mode);
    }
  }, [ params.mode, onDMModeChanged ]);

  return <ProjectMenu/>;
};
