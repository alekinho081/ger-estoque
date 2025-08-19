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
    gap: "10px",
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    padding: "8px 15px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  container: {
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  }
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
              <td style={{ 
                ...styles.td, 
                ...styles.lastTd,
                color: situacao === "OK" ? "#4CAF50" : "#f44336",
                fontWeight: "bold"
              }}>
                {situacao}
              </td>
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


  useEffect(() => {
    const lancamentos = JSON.parse(localStorage.getItem("lancamentosEstoque") || "[]");
  
    const produtosMap = {};
    
    lancamentos.forEach(lancamento => {
      if (!produtosMap[lancamento.produto]) {
        produtosMap[lancamento.produto] = { entrada: 0, saida: 0 };
      }
      
      if (lancamento.tipo === "entrada") {
        produtosMap[lancamento.produto].entrada += parseInt(lancamento.quantidade);
      } else {
        produtosMap[lancamento.produto].saida += parseInt(lancamento.quantidade);
      }
    });
    
    const produtosArray = Object.keys(produtosMap).map(produto => {
      const entrada = produtosMap[produto].entrada;
      const saida = produtosMap[produto].saida;
      const saldo = entrada - saida;
      const situacao = saldo > 10 ? "OK" : "COMPRAR";
      
      return { produto, entrada, saida, saldo, situacao };
    });
    
    setProdutos(produtosArray);
  }, []);

  return (
    <div style={styles.container}>
      <section>
        
      </section>

      <TabelaEstoque dados={produtos} />
    </div>
  );
}

export default PageEstoque;