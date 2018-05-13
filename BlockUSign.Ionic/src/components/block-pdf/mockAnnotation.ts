import objectAssign from 'object-assign';
import uuid from 'uuid';

const TEMPLATE = {
  class: 'Annotation',
  page: 1,
  owner: 'admin'
};

export default (type, def = {}) => objectAssign({}, TEMPLATE, {type}, {uuid: uuid()}, def);
