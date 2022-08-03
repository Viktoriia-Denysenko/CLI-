const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(contacts);
      break;
    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id = ${id} not found`);
      }
      console.log(contact);
      break;
    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;
    case "remove":
      const removeCont = await removeContact(id);
      console.log(removeCont);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);
