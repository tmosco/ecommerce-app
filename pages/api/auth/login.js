import {signin} from 'next-auth/client';


const status = await signin('credentials',{
  redirect:false,
  email:email,
  password :password
});

console.log(staus)