export default function Header() {
    return (
        <header className={"header"}>
            <img className={"svg-title"} src={"../images/alem_do_olhar_title.svg"} alt={"Título do projeto Além do Olhar"}/>
            <article className={"ul-box top"}>
                <p>Esse evento será produzido pelos grupos:</p>
                <p><strong>Através do Espelho | Salus | RHelp | Patinhas do RH</strong></p>
            </article>
            <article className={"ul-box"}>
                <p><strong>O evento apresenta 4 projetos que abordam diferentes desafios e oportunidades para mulheres:</strong></p>
                <ul className={"ul-box-ul-without-points"}>
                    <li><strong>Através do Espelho:</strong> destacando o trabalho de mulheres empreendedoras;</li>
                    <li><strong>Salus:</strong> discutindo a importância da saúde mental no empreendedorismo feminino;
                    </li>
                    <li><strong>RHelp:</strong> oferecendo apoio a mulheres que buscam empregos com carteira assinada;
                    </li>
                    <li><strong>Patinhas do RH:</strong> explorando os desafios enfrentados por mulheres que trabalham
                        com animais e
                        conciliam diferentes papéis.
                    </li>
                </ul>
            </article>
        </header>
    )
}