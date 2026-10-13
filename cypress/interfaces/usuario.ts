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
