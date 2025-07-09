"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

type Contact = {
  id: number;
  type: string;
  value: string;
  sellerFk: number;
  createdAt: string;
  updatedAt: string;
};

export default function MeusContatosPage() {
  const router = useRouter();
  const { session, isAuthenticated, isLoading } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ type: '', value: '' });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
      return;
    }

    if (isAuthenticated && session?.user?.email) {
      fetchContacts();
    }
  }, [isAuthenticated, isLoading, session, router]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contacts');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newContact.type || !newContact.value) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error('Failed to add contact');
      }

      setNewContact({ type: '', value: '' });
      setShowAddForm(false);
      fetchContacts(); // Recarregar lista
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Erro ao adicionar contato');
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    if (!confirm('Tem certeza que deseja remover este contato?')) {
      return;
    }

    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      fetchContacts(); // Recarregar lista
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Erro ao remover contato');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
          <div className="text-center text-red-600 dark:text-red-400">
            <h2 className="text-xl font-semibold mb-2">Acesso Negado</h2>
            <p>Você precisa estar logado para acessar esta página.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 flex flex-col">
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Meus Contatos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie seus contatos para que os compradores possam entrar em contato.
          </p>
        </div>

        {/* Botão Adicionar Contato */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {showAddForm ? 'Cancelar' : '+ Adicionar Contato'}
          </button>
        </div>

        {/* Formulário Adicionar Contato */}
        {showAddForm && (
          <div className="mb-6 bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Adicionar Novo Contato
            </h3>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Contato *
                </label>
                <select
                  id="type"
                  value={newContact.type}
                  onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="email">Email</option>
                  <option value="phone">Telefone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telegram">Telegram</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>

              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Valor do Contato *
                </label>
                <input
                  type="text"
                  id="value"
                  value={newContact.value}
                  onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100"
                  placeholder="Ex: joao@gmail.com ou +55 11 99999-9999"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Adicionar Contato
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Contatos */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400">
            <h2 className="text-xl font-semibold mb-2">Erro</h2>
            <p>{error}</p>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-400 py-8">
            <p>Nenhum contato cadastrado ainda.</p>
            <p>Adicione seus primeiros contatos para começar!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-700 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      {contact.type.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                      {contact.type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {contact.value}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 