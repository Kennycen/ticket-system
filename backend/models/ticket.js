export class Ticket {
    constructor({ name, email, description }) {
      try {
        if (!name || !email || !description) {
          throw new Error('Missing required fields');
        }

        if (typeof name !== 'string' || typeof email !== 'string' || typeof description !== 'string') {
          throw new Error('Invalid field types');
        }

      this.id = Date.now().toString();
      this.name = name;
      this.email = email;
      this.description = description;
      this.status = "new"; 
      this.createdAt = new Date().toISOString();
        this.updatedAt = this.createdAt;
      } catch (error) {
        console.error('Error creating Ticket:', error);
        throw error;
      }
    }

    toJSON() {
      return {
        id: this.id,
        name: this.name,
        email: this.email,
        description: this.description,
        status: this.status,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
    }
  }