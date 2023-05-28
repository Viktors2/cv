
fetch("./test1.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let client = [];
    let id = 0;
    let totalPurchases = 0;

    //loop tto get user info
    for (const user of data) {
      const name = user.name;
      const email = user.email;
      const purchaseHistory = user.purchase_history;
    
      let uniqueProducts = new Set();
      let totalQuantity = 0;
      id++;
        //loop through purchase history
      for (const purchase of purchaseHistory) {
        uniqueProducts.add(purchase.product); //add unique products to product Set()
        totalQuantity += purchase.quantity; //add quantity to total quantity
        totalPurchases += purchase.quantity; //add total purchases

      }
        //object with client data
      client[id] = {
        id: id,
        name: name,
        email: email,
        uniqueProducts: uniqueProducts.size, 
        totalQuantity: totalQuantity
      };
       // Create elements and populate data
       template = document.querySelector("template");
       const userElement = template.content.cloneNode(true);
       userElement.querySelector(".user-id").textContent = id;
       userElement.querySelector(".name").textContent = name;
       userElement.querySelector(".email").textContent = email;
       userElement.querySelector(".uniq").textContent = uniqueProducts.size;
       userElement.querySelector(".total").textContent = totalQuantity;
 
       // Append user element to the table body
       const tbody = document.querySelector("tbody");
       tbody.appendChild(userElement);
     }
        //Total amount of clients using last id
    console.log('Total Purchases:', totalPurchases);
    document.querySelector(".tpurchases").textContent = totalPurchases;
    const totalClients = id;
    console.log("Total clients: " + totalClients);
    document.querySelector(".tclients").textContent = totalClients;
        // Display user by id
    console.log(client[1]);


  });

// ++1. Create	a	JS script	that	reads	the	JSON	file	and	decodes	the	data.	
// ++2. Process	the	data	to	calculate	the	total	number	of	unique	products	and	
// total	quantity	of	all	products	purchased	for	each	user.	
// ++3. Generate	an	HTML	report	displaying	the	summary	information	for	each	
// user.	
// ++4. Ensure	that	the	code	is	well-structured,	efficient,	and	properly	commented.	
// ++5. Provide a brief explanation of the logic behind your solution, including any
// design	choices	and	assumptions	made.	

///1. bootstrap table was used to minimize time spent on styling
// 2. ftetch was used to get data from json file and used .json() to convert it to Object
// 3. for loop was used to loop through users and their data
// 4. I used a Set() to store unique products and then used .size to get number of them
// 5. I used a template to create a table row and then pushed data
// 6. Total stats added as a bonus
