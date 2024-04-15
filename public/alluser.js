const getData = async () => {
    try {
        let fetching = await fetch("http://localhost:3000/api/allUsers")
        let data = await fetching.json()
        data.forEach(element => {
            const first_name = element.first_name
            const last_name = element.last_name
            const email = element.email
            const id = element._id

            // Create a container div for each user's details
            const userContainer = document.createElement("div")
            userContainer.classList.add("user-container")

            // Create div elements for first name, last name, and email
            const firstNameElem = document.createElement("div")
            firstNameElem.innerHTML = `-| First Name: ${first_name}`
            firstNameElem.classList.add('data');

            const lastNameElem = document.createElement("div")
            lastNameElem.innerText = `-| Last Name: ${last_name}`
            lastNameElem.classList.add('data');

            const emailElem = document.createElement("div")
            emailElem.innerText = `-| Email: ${email}`
            emailElem.classList.add('data');


            const _id = document.createElement("div")
            _id.innerHTML = `-| <P style="color: grey;">${id}</P>`
            _id.classList.add('my-class');

            userContainer.appendChild(firstNameElem)
            userContainer.appendChild(lastNameElem)
            userContainer.appendChild(emailElem)
            userContainer.appendChild(_id)

            // Append the container to the main list
            document.getElementById("myList").appendChild(userContainer)
        });
    } catch (error) {
        console.log("Error fetching data:", error)
    }
}
getData()
