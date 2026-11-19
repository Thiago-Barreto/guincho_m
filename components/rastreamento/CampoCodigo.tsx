'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IconeSeta } from '@/components/ui/Icones'

/**
 * CLIENT COMPONENT 2 de 4. Justificativa: estado do input e navegação
 * programática para /rastreamento/[id].
 *
 * Está na FOLHA da árvore. A seção Rastreamento que o contém é servidor.
 *
 * O <form> tem action e method reais: sem JavaScript o navegador ainda
 * submete para /rastreamento e o usuário chega a algum lugar útil.
 */
export function CampoCodigo() {
  const router = useRouter()
  const [codigo, setCodigo] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const limpo = codigo.trim()

    // Os códigos são não sequenciais (nanoid). Aqui só barramos o vazio e o
    // formato claramente inválido — a validação real é no servidor da rota.
    if (limpo.length < 6) {
      setErro('O código tem pelo menos 6 caracteres. Confira a mensagem que enviamos.')
      return
    }

    setErro(null)
    router.push(`/rastreamento/${encodeURIComponent(limpo)}`)
  }

  return (
    <form
      onSubmit={aoEnviar}
      action="/rastreamento"
      method="get"
      className="mt-6 max-w-xl"
      noValidate
    >
      <label htmlFor="codigo-atendimento" className="block font-medium">
        Código do atendimento
      </label>

      <div className="mt-2 flex flex-wrap gap-2">
        <input
          id="codigo-atendimento"
          name="codigo"
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="aK3f9xQ2"
          value={codigo}
          onChange={(e) => {
            setCodigo(e.target.value)
            if (erro) setErro(null)
          }}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? 'erro-codigo' : undefined}
          // Chanfro espelhado (cantos opostos aos do botão) para o par
          // input + botão ler como uma peça só, e não como dois elementos
          // de sistemas diferentes encostados.
          className="campo tabular h-14 min-w-0 flex-1 bg-white px-4 text-lg"
        />

        <button type="submit" className="btn btn-primario">
          Acompanhar
          <IconeSeta />
        </button>
      </div>

      {/* role="alert" para o leitor de tela anunciar o erro na hora. */}
      {erro && (
        <p id="erro-codigo" role="alert" className="mt-2 font-medium text-triangulo">
          {erro}
        </p>
      )}
    </form>
  )
}
