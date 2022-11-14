import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

// get youtube thumbnail from video url - created with github copilot
function getThumbnail(url) {
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

// Custom Hook
function useForm(propsDoForm) {
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    }
}

const PROJECT_URL = "https://bnqzmmopvwvltmmwgyov.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJucXptbW9wdnd2bHRtbXdneW92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTMzMjIsImV4cCI6MTk4NDAyOTMyMn0._VqlcY47slHeqCmSkkvm3COT7S5iIQqLeR64Zls_Fm8";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "Frost punk", url: "https://www.youtube.com/watch?v=QsqatJxAUtk" }
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    console.log();

    /*
    ## O que precisamos para o form funcionar?
    - pegar os dados
        - titulo
        - url do vídeo
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
    */

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {/* Ternário */}
            {/* Operadore de Curto-circuito */}
            {formVisivel ? (
                <form onSubmit={(evento) => {
                    evento.preventDefault();
                    console.log(formCadastro.values);

                    // Contrato entre o nosso Front e o Back
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbnail(formCadastro.values.url),
                        playlist: "jogos",
                    })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                    setFormVisivel(false);
                    formCadastro.clearForm();
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                            X
                        </button>
                        <input
                            placeholder="Titulo do vídeo"
                            name="titulo"
                            value={formCadastro.values.titulo}
                            onChange={formCadastro.handleChange}
                        />
                        <input
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            )
                : false}
        </StyledRegisterVideo>
    )
}

    // [X] Falta o botão para adicionar
    // [X] Modal
    // -> [X] Precisamos controlar o state
    // -> Formulário em si