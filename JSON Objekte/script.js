
//New Contact();
// {
//  firstName: undefined,
//  lastName: undefined
// }

let contatcs = [
   new Contact ('Leocvxb', 'vaxcvbn', '0123123435'), // JSON = Javascript Object Notation#
   new Friend ('Lettto', 'vtttan', '0123123435')
];




// Beschreibung wie ein Objekt aussehen soll
// Vorlage
// Schablone
function addContact(firstName, lastName){
    let myContact = new Contact(firstName, lastName);
    contatcs.push(myContact);
}

addContact('Leo', 'van', '0123123435');
addContact('Leo', 'van', '0123123435');
addContact('Leo', 'van', '0123123435');