class User {
  private id: number;
  private name: string;
  private surname: string;
  private email: string;
  private isCustomer: boolean;
  private isAvailable: boolean;

  constructor(user: any, isCustomer = false, isAvailable = false) {
    this.id = parseInt(user.id);
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.isCustomer = isCustomer;
    this.isAvailable = isAvailable;
  }

  public getIsAvailable = () => {
    return this.isAvailable
  }

  public setIsAvailable = (isAvailable: boolean) => {
    this.isAvailable = isAvailable
  }
}

export default User;
