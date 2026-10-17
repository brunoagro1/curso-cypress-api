export interface CriarUsuarioParams {
  nome: string;
  cargo: string;
  email: string;
  telefone: string;
  status: "active" | "inactive";
  perfil?: string;
  usuarioErp?: string;
}

interface ObterUsuariosParams {
  substr?: string;
  sort?: string;
  per_page?: number;
  page?: number;
}

// PATCH: campos opcionais, envia só o que for alterar (e-mail não pode ser alterado)
export interface EditarUsuarioParams {
  nome?: string;
  cargo?: string;
  telefone?: string;
  status?: "active" | "inactive";
  perfil_ids?: string[];
  usuario_erp_id?: string;
}
