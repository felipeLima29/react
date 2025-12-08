import { openDb } from "../openDB.js";
import sendResetPassword from "../services/resetEmailService.js";
import UserDAO from '../dao/UsersDAO.js';
import UserUtil from "../utils/userUtils.js";
import dotenv from 'dotenv';
dotenv.config();

const userDAO = new UserDAO();
const userUtil = new UserUtil();
// Cria ambas as tabelas de Usuários e Administradores
export async function createTable() {
    await userDAO.createTable();
}

// Função para inserir usuário.
export async function insertUser(req, res) {
    let user = req.body;

    let nome = user.nome;
    let email = user.email;
    let password = user.password;


    if (typeof nome === 'string' || typeof email === 'string' || typeof password === 'string') {
        const nomeTrim = nome.trim();
        const emailTrim = email.trim();
        const passwordTrim = password.trim();

        // Verificações padrões.
        if (nomeTrim == "" || emailTrim == "" || passwordTrim == "") {
            res.status(400);
            res.json({
                msg: "Preencha todos os campos."
            });
        } else if (passwordTrim.length < 8) {
            res.status(400);
            res.json({
                msg: "A senha deve conter mais que 8 dígitos."
            });
        } else {
            try {
                await userDAO.insertUserDAO(user.nome, user.email, user.password);
                res.json({ msg: "Usuário inserido com sucesso!" });
            } catch (error) {
                error.body;
            }
        }


    } else {
        res.status(400)
        res.json({
            msg: "Erro na tipagem dos dados fornecidos"
        })

    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
}

// Função para listar usuários.
export async function selectAllUsers(req, res) {
    try {
        const users = await userDAO.selectAllUsersDAO();
        res.json(users);
    } catch (error) {
        error.body;
    }
}

// Função para deletar usuários.
export async function deleteUser(req, res) {
    let id = req.body.id;


    let idString = id.toString();
    let idTrim = idString.trim();

    if (idTrim == "" || idTrim == null) {
        res.json({
            statusCode: 400,
            msg: "Digite um id."
        })
    } else {
        try {
            await userDAO.deleteUserDAO(id);
            res.json({ msg: "Usuário deletado com sucesso." });
        } catch (error) {
            res.status(400);
            res.json({
                msg: "Erro ao deletar usuário.",
                statusCode: "400"
            });
        }
    }

}

// Função para atualizar dados de usuários.
export async function updateUser(req, res) {
    let usuario = req.body

    let idString = usuario.id.toString();
    let idTrim = idString.trim();
    let nomeTrim = usuario.nome.trim();
    let emailTrim = usuario.email.trim();
    let passwordTrim = usuario.password.trim();
    try {
        // Verificações padrões.
        if (idTrim == "" || nomeTrim == "" || emailTrim == "" || passwordTrim == "") {
            res.status(400);
            res.json({
                statusCode: 400,
                msg: "Preencha todos os campos"
            });
        } else if (passwordTrim.length < 8) {
            res.status(400);
            res.json({
                msg: "A senha deve conter ao menos 8 dígitos."
            });
        } else {
            // Confere se existe um usuário com o id fornecido.
            try {
                const result = await userUtil.verifyUserIdUtil(idTrim);
                if (!result) {
                    res.json({ msg: "Id não cadastrado nesse sistema." })
                } else {
                    await userDAO.updateUserDAO(usuario.nome, usuario.email, usuario.password, usuario.id);
                    res.json({ msg: "Usuário atualizado com sucesso." });
                }
            } catch (error) {
                res.status(500);
                res.json({ msg: "Ocorreu um erro no servidor." });
            }
        }

    } catch (error) {
        res.status(400)
        res.json({
            msg: "Ocorreu algum erro, confira se você inseriu todos os dados necessários."
        })
    }

}

// Função para listar um único usuário.
export async function selectUser(req, res) {
    let id = req.body.id;

    let idString = id.toString();
    let idTrim = idString.trim();

    // Verificações padrões.
    if (idTrim == "") {
        res.status(400);
        res.json({
            statusCode: 400,
            msg: "Digite um id."
        })
    } else {
        try {
            // Confere se existe um usuário com o id fornecido.
            const user = await userDAO.selectUserDAO(id);
            console.log("oi");
            if (!user) {
                res.json({ msg: "Usuário não encontrado." })
                console.log(user);
            } else {
                res.json(user);
                console.log(user);
            }
        } catch (error) {
            res.status(400);
            res.json({
                statusCode: "400",
                msg: "Ocorreu algum erro."
            })
        }
    }
}

// Função para verificar se o email ja foi cadastrado no banco.
export async function verifyEmail(req, res) {
    let email = req.body.email;

    let emailTrim = email.trim();

    // Verificações padrões.
    if (emailTrim == "") {
        res.status(400);
        res.json({
            statusCode: 400,
            msg: "Digite um email."
        })
    } else {

        try {
            const user = await userUtil.verifyEmailUtil(email);
            if (!user) {
                res.json({ msg: "Email não cadastrado." });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.status(500);
            res.json({ msg: "Erro ao acessar servidor." });
        }

    }

}

// Função para fazer login do usuário.
export async function loginUser(req, res) {
    let user = req.body;

    let emailTrim = user.email.trim();
    let passwordTrim = user.password.trim();

    // Verificações padrões.
    if (emailTrim == "" || passwordTrim == "") {
        res.status(400)
        res.json({ msg: "Digite algo nos campos de email e password." });
    } else if (passwordTrim.length < 8) {
        res.status(400);
        res.json({ msg: "A senha deve conter ao menos 8 dígitos." });
    } else {
        try {
            const email = emailTrim;
            const password = passwordTrim;
            const user = await userDAO.loginUserDAO(email, password);
            if (!user) {
                res.json({ msg: "Usuário não encontrado." });
            } else {
                res.json(user);
            }
        } catch (error) {
            res.json({ msg: "Erro ao buscar usuário" });
        }
    }
}

// Função para enviar código para o email do usuário.
export async function forgetPassword(req, res) {
    const user = req.body;

    let emailTrim = user.email.trim();

    // Verificações padrões.
    if (emailTrim == '' || emailTrim == null) {
        res.status(400);
        res.json({ msg: "Digite algo no email." });
    } else {
        let email = emailTrim;
        console.log(email);
        try {
            // Confere se existe um usuário com o email fornecido.
            const verifyEmail = await userUtil.verifyEmailUtil(email);
            console.log(verifyEmail);
            if (!verifyEmail) {
                res.json({ msg: "Este email não está cadastrado no sistema." });
            } else {
                // Gera um código de 6 dígitos aleatório.
                let cod = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
                const id = verifyEmail.id;
                cod = cod.toString();

                const sendEmail = async () => {
                    try {
                        // Aguarda a execução do método de enviar email.
                        await sendResetPassword(email, cod);
                        res.json({
                            msg: "Código de recuperação enviado com sucesso.",
                            code: cod,
                            idUser: id
                        });
                    } catch (error) {
                        res.status(500);
                        res.json({ msg: "Ocorreu algum erro inesperado." });
                    }
                }
                sendEmail();
            }
        } catch (error) {
            res.status(500);
            res.json({ msg: "Erro ao acessar o servidor." });
        }
    }

}

// Função para atualizar a senha do usuário.
export async function resetPassword(req, res) {
    const data = req.body;

    let idUserString = data.idUser.toString();
    let idUserTrim = idUserString.trim();
    let passwordUserTrim = data.passwordUser.trim();
    let passwordUserConfirmTrim = data.passwordUserConfirm.trim();

    // Verificações padrões.
    if (passwordUserTrim == "" || passwordUserTrim == null || passwordUserConfirmTrim == "" || passwordUserConfirmTrim == null || idUserTrim == "" || idUserTrim == null) {
        res.status(400);
        res.json({ msg: "Preencha todos os campos." });
    } else if (passwordUserTrim !== passwordUserConfirmTrim) {
        res.status(400);
        res.json({ msg: "As senhas não coincidem." });
    } else {
        let password = passwordUserTrim;
        let passwordConfirm = passwordUserTrim;
        let id = idUserTrim;

        try {
            // Confere se existe um usuário com o id fornecido.
            const verifyUser = await userUtil.verifyUserIdUtil(id);
            if (!verifyUser) {
                res.json({ msg: "Este id não está cadastrado no sistema." });
            } else {
                await userDAO.updatePasswordUserDAO(password, id);
                res.json({ msg: "Senha atualizada com sucesso." })
            }
        } catch (error) {
            res.status(500);
            res.json({ msg: "Erro ao acessar o servidor." });
        }
    }
}