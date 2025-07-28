'use client';

import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";
import { Button  } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label"

export default function AdminLogin(){
    const {isAuthenticated , login} = useAuthStore();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(()=>{
        if(isAuthenticated){
            router.push('/admin/dashboard')
        }
    },[isAuthenticated , router]);

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        const success = login(email , password);
        if(!success){
            setError('Invalid credential')
        }
    };

    return(
        <div>
    <div className=" flex justify-center items-center h-screen box-content  bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  </div>
    )


}