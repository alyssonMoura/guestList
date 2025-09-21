import { useState } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:3000/users/register';
export function UserRegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ name, email, phone, password, confirmPassword });
    try {
        axios.post(`${API_URL}`, { name, username, email, phone, password });
        setUsername('');
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        alert('Convidado salvo com sucesso!');
        // window.location.href = `/`;
    } catch {
        console.error('Erro ao adicionar convidado');
        alert('Erro ao adicionar convidado');
    } 
}


  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col justify-between group/design-root overflow-x-hidden font-manrope">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex items-center">
          <button className="text-gray-800">
            <span className="material-symbols-outlined text-3xl"> arrow_back </span>
          </button>
          <h1 className="flex-1 text-center text-2xl font-bold text-gray-900">Criar conta</h1>
          <div className="w-8"></div>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium" htmlFor="name">Nome</label>
            <input
              className="form-input w-full rounded-lg border-gray-300 bg-white p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              id="name"
              placeholder="Digite seu nome completo"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium" htmlFor="username">Username</label>
            <input
              className="form-input w-full rounded-lg border-gray-300 bg-white p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              id="username"
              placeholder="Digite seu username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium" htmlFor="email">Email</label>
            <input
              className="form-input w-full rounded-lg border-gray-300 bg-white p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              id="email"
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium" htmlFor="phone">Telefone</label>
            <input
              className="form-input w-full rounded-lg border-gray-300 bg-white p-4 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              id="phone"
              placeholder="Digite seu telefone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium" htmlFor="password">Senha</label>
            <div className="relative">
              <input
                className="form-input w-full rounded-lg border-gray-300 bg-white p-4 pr-12 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                id="password"
                placeholder="Crie uma senha forte"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500" type="button">
                <span className="material-symbols-outlined"> visibility_off </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium" htmlFor="confirm-password">Confirmar senha</label>
            <div className="relative">
              <input
                className="form-input w-full rounded-lg border-gray-300 bg-white p-4 pr-12 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                id="confirm-password"
                placeholder="Confirme sua senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500" type="button">
                <span className="material-symbols-outlined"> visibility_off </span>
              </button>
            </div>
          </div>
          <button
            className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#137fec] py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105"
            type="submit"
          >
            Criar conta
          </button>
        </form>
      </div>
      {/* <footer className="sticky bottom-0 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <nav className="flex justify-around py-2">
          <a className="flex flex-col items-center gap-1 text-gray-500" href="#">
            <span className="material-symbols-outlined"> event </span>
            <span className="text-xs font-medium">Meus Eventos</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-gray-500" href="#">
            <span className="material-symbols-outlined"> celebration </span>
            <span className="text-xs font-medium">Eventos</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-gray-500" href="#">
            <span className="material-symbols-outlined"> group </span>
            <span className="text-xs font-medium">Convidados</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-blue-600" href="#">
            <span className="material-symbols-outlined"> account_circle </span>
            <span className="text-xs font-medium">Perfil</span>
          </a>
        </nav>
        <div className="h-safe-area-bottom bg-white/80"></div>
      </footer> */}
    </div>
  );
}
