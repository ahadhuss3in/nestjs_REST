import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { createuserdto } from './dto/createuser-dto.js';
import { updateuserdto } from './dto/updateuser-dto.js';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
    private users = [
        {
            id: randomUUID(),
            name: 'Maya Okonkwo',
            age: 27,
            email: 'maya.okonkwo@example.com',
        },
        {
            id: randomUUID(),
            name: 'Daniel Reyes',
            age: 31,
            email: 'daniel.reyes@example.com',
        },
        {
            id: randomUUID(),
            name: 'Priya Raman',
            age: 25,
            email: 'priya.raman@example.com',
        },
        {
            id: randomUUID(),
            name: 'Tomasz Kowalski',
            age: 34,
            email: 'tomasz.kowalski@example.com',
        },
        {
            id: randomUUID(),
            name: 'Amara Diallo',
            age: 29,
            email: 'amara.diallo@example.com',
        },
        {
            id: randomUUID(),
            name: 'Jonas Lindqvist',
            age: 38,
            email: 'jonas.lindqvist@example.com',
        },
    ];

    findall(){
        return this.users
    }

    findone(id:string){
           const matcheduser = this.users.find((users)=> users.id===id)
           if(!matcheduser){
            throw new HttpException(`Not found any profile with ${id}`,HttpStatus.NOT_FOUND); 
           }

        return matcheduser;
    }

    create(createuserdto:createuserdto){
        const createduser = {
            id: randomUUID(),
            ...createuserdto,
        };

        this.users.push(createduser);
        return createduser;
    }

    update(id:string, updateuserdto:updateuserdto){
        const matcheduser  =  this.users.find((existinguser)=>
            existinguser.id === id)

        if(!matcheduser){
            throw new HttpException(`Not found any ExisitngUser with ${id}`,HttpStatus.NOT_FOUND); 
        }

        matcheduser.name=updateuserdto.name;
        matcheduser.email=updateuserdto.email;
        matcheduser.age=updateuserdto.age;

        return matcheduser;

    }


    remove(id:string):void{
            const matchinguser = this.users.findIndex(
                (users) => users.id===id
            );

            if(matchinguser>-1){
                this.users.splice(matchinguser);
            }

    }
}