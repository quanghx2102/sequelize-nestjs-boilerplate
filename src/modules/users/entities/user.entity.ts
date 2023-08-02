import { BeforeCreate, Column, Model, Table } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @BeforeCreate
  static async hashPassword(instance: User) {
    const saltRounds = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(instance.password, saltRounds);

    instance.password = hashedPassword;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
