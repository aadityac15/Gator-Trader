const createDomElement = (element) => {
	return document.createElement(element);
}

const selectDomElement = (id) => {
	return document.getElementById(id);
}

const clearData = () => {
  const tableTag = document.querySelector("table");
  if (document.querySelector("tr")) {
    tableTag.removeChild(document.querySelector("tr"));
    tableTag.removeChild(document.querySelector("tr"));
  }
};
