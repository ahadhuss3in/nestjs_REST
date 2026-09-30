import { Controller, Get, Param, Post, Query, Body, Put, Delete, HttpCode, HttpStatus, HttpException, ParseUUIDPipe, ValidationPipe} from '@nestjs/common';
import {createuserdto} from './dto/createuser-dto.js';
import {updateuserdto} from './dto/updateuser-dto.js';
import {UserService} from './user.service.js'
import type { UUID } from 'crypto';
import { UuidParam, Roles } from '../decorators/index.js';

@Controller('user')
export class UserController {

constructor (private userservice:UserService){}

@Get()
@Roles('admin')
FindAll(){
    return this.userservice.findall();
}

@Get(':id')
findone(@UuidParam('id') id:string){
    return  this.userservice.findone(id);

}

@Post()
create(@Body(new ValidationPipe()) createuserdto:createuserdto){
    return this.userservice.create(createuserdto);
}

@Put(':id')
updateuser(@Param('id') id:string,
           @Body() updateuserdto:updateuserdto){
    return this.userservice.update(id,updateuserdto);

}

@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
deleteuser(@Param('id')id:string){
    return this.userservice.remove(id)
}

}
