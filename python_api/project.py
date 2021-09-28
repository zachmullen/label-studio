import time

from enum import Enum
from typing import Optional, Union, List, Dict
from .client import ClientObject


class ProjectSampling(Enum):
    RANDOM = 1
    SEQUENCE = 2
    UNCERTAINTY = 3


class ProjectState:
    """Determines current project state (annotation counters, updated IDs, etc.)"""
    pass


class Project(ClientObject):

    @classmethod
    def get_from_id(cls, client, id):
        """Class factory to create Project instance from project ID"""
        pass

    def set_option(self, **kwargs):
        """
        Low level function to set project options
        :param kwargs:
        :return:
        """
        pass

    def set_sampling(self, sampling: ProjectSampling):
        """
        Set project sampling
        :param sampling:
        :return:
        """
        self.set_option(sampling=sampling)

    def set_published(self, is_published: bool):
        """
        Set project publishing state
        :param is_published:
        :return:
        """
        self.set_option(is_published=is_published)

    def set_model_version(self, model_version: str):
        """
        Set active model version
        :param model_version: any string
        :return:
        """
        self.set_option(model_version=model_version)

    def annotate(self, plan) -> ProjectState:
        """
        Blocks runtime until the current annotation process completes.
        Annotation process is defined by "plan"
        :param plan: JSON object that defines completion trigger
        :return: ProjectState object
        """
        pass

    def get_tasks(
        self,
        filters: Optional[List[Dict]] = None,
        order: Optional[List[Dict]] = None,
        view_id: Optional[int] = None,
        selected_ids: Optional[List[int]] = None
    ):
        """
        Get tasks slice based on filters, orders or view id specified
        :param filters: JSON objects representes DataManager filters
        :param order: JSON objects representes DataManager orderings
        :param view_id: existed View ID
        :param selected_ids:
        :return:
        """
        pass

    def get_labeled_tasks(self):
        return self.get_tasks(filters=[{'Annotations': {'>': 0}}])

    def get_unlabeled_tasks(self):
        return self.get_tasks(filters=[{'Annotations': {'is_empty': 'yes'}}])

    def create_prediction(
        self,
        task_id: int,
        result: Optional[List[Dict]] = None,
        score: Optional[float] = 0,
        model_version: Optional[str] = None
    ):
        """
        Create prediction for a specific task
        :param task_id: task ID
        :param result:
        :param score:
        :param model_version:
        :return:
        """
        pass

    def create_bulk_predictions(self, predictions, task_ids):
        """More efficient way of calling 'create_prediction' many times"""
        pass

    # def is_completed(self):
    #     status = self.client.make_request(method='GET', url=f'/api/projects/{self.id}/status')
    #     return status.get('is_completed')
    #
    # def import_tasks_from_list(self, data: List[str]):
    #     """
    #     Import tasks from list of strings
    #     :param data: list of strings, each item is a text representation of task (text or url
    #     :return:
    #     """
    #     data_fields = self.label_config.get_data_fields()
    #     if len(data_fields) > 1:
    #         raise ValueError(f"Can't create tasks from list with multiple data fields: {data_fields}")
    #     data_field = data_fields[0]
    #     tasks = [{data_field: item} for item in data]
    #     self.client.make_request(method='POST', url=f'/api/projects/{self.id}/import', json=tasks)
    #
    # def annotate(self):
    #     """
    #     Wait until annotation process is finished
    #     :return:
    #     """
    #     while not self.is_completed():
    #         time.sleep(10)
    #
    # def get_results(self, minify=False):
    #     """
    #     Get annotation results in specified format
    #     :param minify: if True, outputs minified form of annotation results, otherwise raw full JSON results
    #     :return:
    #     """
    #     results = self.client.make_request(method='GET', url=f'/api/projects/{self.id}/export?raw=true')
    #     if minify:
    #         results = self.label_config.minify_results(results)
    #     return results
