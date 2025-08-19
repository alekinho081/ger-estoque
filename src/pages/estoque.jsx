import React, { useState } from "react";

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
};

function TabelaEstoque({ dados }) {
  return (
    <table style={styles.table}>
      <thead style={styles.thead}>
        <tr>
          <th style={styles.th}>PRODUTO</th>
          <th style={styles.th}>ENTRADA</th>
          <th style={styles.th}>SAÍDA</th>
          <th style={styles.th}>SALDO</th>
          <th style={styles.th}>SITUAÇÃO</th>
        </tr>
      </thead>
      <tbody>
        {dados && dados.length > 0 ? (
          dados.map(({ produto, entrada, saida, saldo, situacao }, idx) => (
            <tr key={idx} style={styles.tr}>
              <td style={styles.td}>{produto}</td>
              <td style={styles.td}>{entrada}</td>
              <td style={styles.td}>{saida}</td>
              <td style={styles.td}>{saldo}</td>
              <td style={{ ...styles.td, ...styles.lastTd }}>{situacao}</td>
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

export function PageEstoque() {
  const [produtos, setProdutos] = useState([]);
  const [prodNome, setProdNome] = useState("");
  const [qtdProduto, setQtdProd] = useState("");

  function handleButton(e) {
    e.preventDefault();

    if (!prodNome || !qtdProduto) return;

    const entrada = Number(qtdProduto);
    const saida = 0;
    const saldo = entrada - saida;
    const situacao = saldo > 10 ? "OK" : "COMPRAR";

    setProdutos((prev) => [
      ...prev,
      { produto: prodNome, entrada, saida, saldo, situacao },
    ]);

    setProdNome("");
    setQtdProd("");
  }

  return (
    <div>
      <section>
        <h2>GERENCIAMENTO DE ESTOQUE</h2>
        <p>{produtos.prodNome}</p>
      </section>
      <section>
        <form onSubmit={handleButton}>
          <input
            placeholder={"Nome"}
            value={prodNome}
            onChange={(e) => setProdNome(e.target.value)}
          />
          <input
            placeholder={"Quantidade"}
            value={qtdProduto}
            onChange={(e) => setQtdProd(e.target.value)}
            type="number"
          />
          <button type={"submit"}>Enviar</button>
        </form>
      </section>

      <TabelaEstoque dados={produtos} />
    </div>
  );
}

export default PageEstoque;
