import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Select from "react-select";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { validateCPF, validateCNPJ } from "../utils/validate-document";

export default function Cadastro() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState("driver");
  const [documento, setDocumento] = useState("");
  const [documentoRaw, setDocumentoRaw] = useState("");

  const formatDocumento = (value: string, type: string) => {
    const digits = value.replace(/\D/g, "");
    if (type === "driver") {
      return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  const options = [
    { value: "driver", label: "Autônomo" },
    { value: "company", label: "Empresa" },
  ];

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      marginBottom: "15px",
    }),
  };
  function validateForm(): boolean {
    const novosErros = {
      nome: "",
      email: "",
      documento: "",
      senha: "",
    };

    // Nome
    if (!nome.trim()) {
      novosErros.nome = "Nome é obrigatório";
    } else if (nome.trim().length < 3) {
      novosErros.nome = "Nome deve ter pelo menos 3 caracteres";
    }

    // Email
    if (!email.trim()) {
      novosErros.email = "Email é obrigatório";
    } else if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(email)) {
      novosErros.email = "Email inválido";
    }

    // Documento
    if (!documentoRaw.trim()) {
      novosErros.documento = "Documento é obrigatório";
    } else if (tipo === "driver") {
      if (documentoRaw.length !== 11) {
        novosErros.documento = "CPF deve ter 11 dígitos";
      } else if (!validateCPF(documentoRaw)) {
        novosErros.documento = "CPF inválido";
      }
    } else if (tipo === "company") {
      if (documentoRaw.length !== 14) {
        novosErros.documento = "CNPJ deve ter 14 dígitos";
      } else if (!validateCNPJ(documentoRaw)) {
        novosErros.documento = "CNPJ inválido";
      }
    }
    // Senha
    if (!senha.trim()) {
      novosErros.senha = "Senha é obrigatória";
    } else if (senha.length < 6) {
      novosErros.senha = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(novosErros);

    const temErro = Object.values(novosErros).some((error) => error !== "");

    if (temErro) {
      const primeiroErro = Object.values(novosErros).find(
        (error) => error !== "",
      );

      if (primeiroErro) {
        toast.error(primeiroErro, {
          icon: <FontAwesomeIcon icon={faCircleXmark} color="red" size="1x" />,
        });
      }

      return false;
    }

    return true;
  }
  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/users/", {
        name: nome,
        email: email,
        cpf: documentoRaw,
        type: tipo,
        password: senha,
      });
      console.log(response.data);

      toast.success("Usuário cadastrado!", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ fontSize: "20px", color: "#22c55e" }}
          />
        ),
      });
      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error("Erro ao cadastrar o usuário!", {
        icon: (
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{ fontSize: "20px", color: "#ef4444" }}
          />
        ),
      });
    }
    setErrors({});
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Cadastro</h2>

        <form onSubmit={handleCadastro} noValidate>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder={
              tipo === "driver" ? "Digite seu CPF" : "Digite seu CNPJ"
            }
            value={formatDocumento(documentoRaw, tipo)}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              const maxLength = tipo === "driver" ? 11 : 14;
              setDocumentoRaw(digits.slice(0, maxLength));
            }}
          />

          <Select
            options={options}
            styles={customStyles}
            onChange={(selected: any) => {
              if (selected) {
                setTipo(selected.value);
                setDocumentoRaw("");
              }
            }}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            maxLength={6}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Cadastrar</button>

          <button type="button" onClick={() => navigate("/")}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
