const fetchData = async () => {
  let dataReceived = undefined;
  let dataLength = 0;
  let name = "";
  let major = "";
  const dataTag = document.querySelector("data");
  const ulTag = document.createElement("ul");

  console.log("in the etch data");

  await fetch("./dummy_data.json", {
    // method : 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log(typeof data[0]);
      console.log(
        "Length of the data",
        Object.keys(data[data.length - 1]).length
      );
      dataLength = Object.keys(data[data.length - 1]).length;

      // dataLength = Object.keys(data[data.length-1].length); //Will have to change this;
      console.log(dataLength);
      dataReceived = data;
      console.log(data);
      console.log(data[0]);
    });

  for (let i = 0; i < dataLength; i++) {
    for (let j = 0; j < dataLength; j++) {
      console.log("datarecd", dataReceived);
      name = dataReceived[i][j].name;
      major = dataReceived[i][j].major;
    }
    const liTag = document.createElement("li");
    const pTag = document.createElement("p");
    pTag.textContent = name;
    pTag.textContent = major;
    liTag.appendChild(pTag);
    ulTag.appendChild(liTag);
  }
  dataTag.appendChild(ulTag);
};
