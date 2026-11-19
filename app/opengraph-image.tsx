import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

/**
 * Gerada no build. Resolve o placeholder quebrado de og:image do site atual —
 * item 1 da sequência sugerida, e o que mais rápido muda o resultado, porque
 * cada compartilhamento no WhatsApp hoje mostra uma imagem quebrada.
 *
 * Sem next/font aqui: o ImageResponse roda no runtime edge e carregar a
 * fonte custaria um fetch no build. A system-ui do renderizador resolve,
 * e o que importa nesta imagem é o telefone ser legível na prévia.
 */
export const alt = `${site.nome} — Guincho 24 horas em Manaus. Telefone ${site.telefone}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0E1A24',
          padding: '64px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: '0.16em',
              color: '#FF9500',
              fontWeight: 600,
            }}
          >
            {`${site.nome.toUpperCase()} · MANAUS-AM`}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 86,
              lineHeight: 1.05,
              color: '#FFFFFF',
              fontWeight: 700,
              marginTop: 28,
            }}
          >
            <span>Guincho 24 horas</span>
            <span>em Manaus</span>
          </div>
        </div>

        {/* O telefone é o produto: maior elemento também na prévia. */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 100, color: '#FF9500', fontWeight: 700 }}>
            {site.telefone}
          </div>
          <div style={{ fontSize: 26, color: '#9FB1BE', marginTop: 8 }}>
            Carros · Utilitários e vans · Máquinas e equipamentos
          </div>
        </div>

        {/* Faixa de socorro, o motivo da fita refletiva.
            Satori não suporta repeating-linear-gradient — o gradiente vira
            uma barra chapada. As faixas são montadas como elementos reais,
            inclinados com transform. */}
        <div
          style={{
            display: 'flex',
            height: 16,
            width: '100%',
            overflow: 'hidden',
            backgroundColor: '#1B2C39',
          }}
        >
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 22,
                height: 40,
                marginTop: -12,
                marginRight: 22,
                backgroundColor: '#FF9500',
                transform: 'skewX(-25deg)',
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  )
}
