import React from "react";
import { NavLink } from "react-router-dom";
import { useProject } from "../../providers/ProjectProvider";
import { Block, Elem } from "../../utils/bem";
import "./ProjectMenu.styl";

const links = {
  '/data': { label: 'Data Manager' },
  '/settings': { label: 'Settings',  exact: false },
  '/data/import': { label: "Import" },
  '/data/export': { label: 'Export' },
};

export const ProjectMenu = () => {
  const { project } = useProject();

  if (project?.id === undefined) return null;

  return (
    <Block name="project-menu">
      {Object.entries(links).map(([ path, { label, exact } ]) => (
        <Elem
          key={path}
          name="link"
          tag={NavLink}
          exact={exact ?? true}
          to={`/projects/${project.id}${path}`}
          data-external
        >
          {label}
        </Elem>
      ))}
    </Block>
  );
};
