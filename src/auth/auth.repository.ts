//import { ConflictException, InternalServerErrorException } from "@nestjs/common";
//import { AuthCredentialsDto } from "./dto/authCredentialsDto";
//import * as bcrypt from 'bcrypt';
//import { User } from "./user.entity";

//export class AuthRepo{
  //  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    //    const { username, password } = authCredentialsDto;
    
      //  const user = new User();
        //user.username = username;
        //user.salt = await bcrypt.genSalt();
        //user.password = await this.hashPassword(password, user.salt);
    
        //try {
          //await user.save();
        //} catch (error) {
          //if (error.code === '23505') {
            //throw new ConflictException('ussername already exist');
          //} else {
            //throw new InternalServerErrorException();
          //}
        //}
      //}
      //private async hashPassword(password: string, salt: string): Promise<string> {
        //return bcrypt.hash(password, salt);
      //}
//}