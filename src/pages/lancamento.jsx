import React, { useState, useEffect } from "react";

const styles = {
    table: {
        borderCollapse: "separate",
        borderSpacing: "0 8px",
        width: "100%",
        backgroundColor: "#f5f5f5",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop: "20px",
    },
    thead: {
        backgroundColor: "#333",
        color: "#fff",
    },
    th: {
        padding: "12px 16px",
        textAlign: "center",
        fontWeight: "600",
        fontSize: "14px",
    },
    tr: {
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
    td: {
        padding: "12px 16px",
        textAlign: "center",
        fontSize: "14px",
        color: "#333",
        borderRight: "1px solid #eee",
    },
    lastTd: {
        borderRight: "none",
    },
    noData: {
        padding: "20px",
        textAlign: "center",
        color: "#777",
        fontStyle: "italic",
    },
    form: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        maxWidth: "50%",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    input: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
    },
    select: {
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
        backgroundColor: "white",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
    },
    clearButton: {
        padding: "10px 15px",
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        marginTop: "10px",
    }
};

export const PageLancamento = () => {
    function TabelaEstoque({ dados }) {
        return (
            <table style={styles.table}>
                <thead style={styles.thead}>
                    <tr>
                        <th style={styles.th}>DATA</th>
                        <th style={styles.th}>TIPO</th>
                        <th style={styles.th}>DESCRIÇÃO</th>
                        <th style={styles.th}>PRODUTO</th>
                        <th style={styles.th}>QTD</th>
                    </tr>
                </thead>
                <tbody>
                    {dados && dados.length > 0 ? (
                        dados.map(({ data, tipo, descricao, produto, quantidade }, idx) => (
                            <tr key={idx} style={styles.tr}>
                                <td style={styles.td}>{data}</td>
                                <td style={styles.td}>{tipo}</td>
                                <td style={styles.td}>{descricao}</td>
                                <td style={styles.td}>{produto}</td>
                                <td style={styles.td}>{quantidade}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={styles.noData}>
                                Nenhum dado disponível
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    const [produtos, setProdutos] = useState(() => {
        const saved = localStorage.getItem("lancamentosEstoque");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [descricao, setDescricao] = useState("compra");
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [tipo, setTipo] = useState("entrada");

    useEffect(() => {
        localStorage.setItem("lancamentosEstoque", JSON.stringify(produtos));
    }, [produtos]);

    function transformaTexto(texto){
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toUpperCase()
    }

    function handleSubmit(e) {
        e.preventDefault();

        const dataAtual = new Date();
        const dataFormatada = `${dataAtual.getDate().toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear()} ${dataAtual.getHours().toString().padStart(2, '0')}:${dataAtual.getMinutes().toString().padStart(2, '0')}`;

        if (!produto || !quantidade) return;

        const novoLancamento = {
            data: dataFormatada,
            tipo,
            descricao,
            produto,
            quantidade: parseInt(quantidade)
        };

        setProdutos((prev) => [...prev, novoLancamento]);
        setDescricao("compra");
        setTipo("entrada");
        setProduto("");
        setQuantidade("");
    }

    function limparLancamentos() {
        if (window.confirm("Tem certeza que deseja limpar todos os lançamentos?")) {
            setProdutos([]);
        }
    }

    return (
        <div>
            <section>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        style={styles.select}
                    >
                        <option value="entrada">Entrada</option>
                        <option value="saída">Saída</option>
                    </select>

                    <select
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        style={styles.select}
                    >
                        <option value="compra">Compra</option>
                        <option value="venda">Venda</option>
                        <option value="devolucao">Devolução</option>
                    </select>

                    <input
                        placeholder={"Produto"}
                        value={produto}
                        onChange={(e) => setProduto(transformaTexto(e.target.value))}
                        type="text"
                        style={styles.input}
                        required
                    />

                    <input
                        placeholder={"Quantidade"}
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        type="number"
                        style={styles.input}
                        required
                    />

                    <button type={"submit"} style={styles.button}>
                        Enviar
                    </button>
                    
                    <button 
                        type={"button"} 
                        onClick={limparLancamentos} 
                        style={styles.clearButton}
                        disabled={produtos.length === 0}
                    >
                        Limpar Lançamentos
                    </button>
                </form>
            </section>

            <TabelaEstoque dados={produtos} />
        </div>
    );
};

export default PageLancamento;