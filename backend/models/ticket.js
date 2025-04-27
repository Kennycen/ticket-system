export class Ticket {
    constructor({ name, email, description }) {
      this.id = Date.now().toString();
      this.name = name;
      this.email = email;
      this.description = description;
      this.status = "new"; 
      this.createdAt = new Date().toISOString();
    }
  }