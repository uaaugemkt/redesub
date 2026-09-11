import { useId, useRef, useState, type DragEvent } from "react";
import { ALLOWED_RESUME_ACCEPT, formatFileSize } from "../../lib/careers";

interface ResumeUploadFieldProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

/**
 * Só reporta o arquivo escolhido — a validação de extensão/tamanho acontece
 * no formulário pai (mesmas regras usadas na validação geral do submit), para
 * ter uma única fonte de mensagens de erro.
 */
export default function ResumeUploadField({ file, onChange, error }: ResumeUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const errorId = useId();

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const dropped = event.dataTransfer.files[0];
    if (dropped) onChange(dropped);
  };

  return (
    <div className="resume-upload">
      <div
        className={`resume-upload__zone ${dragActive ? "resume-upload__zone--active" : ""} ${
          error ? "resume-upload__zone--error" : ""
        } ${file ? "resume-upload__zone--filled" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="resume-upload__file">
            <span className="resume-upload__file-icon" aria-hidden="true">
              <CheckIcon />
            </span>
            <div className="resume-upload__file-info">
              <span className="resume-upload__file-name">{file.name}</span>
              <span className="resume-upload__file-size">{formatFileSize(file.size)} · anexado</span>
            </div>
            <button
              type="button"
              className="resume-upload__remove"
              aria-label="Remover currículo anexado"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <>
            <span className="resume-upload__icon" aria-hidden="true">
              <UploadIcon />
            </span>
            <p className="resume-upload__title">Anexe seu currículo</p>
            <p className="resume-upload__hint">PDF, DOC ou DOCX · máximo 5 MB</p>
            <button
              type="button"
              className="btn btn--outline btn--sm resume-upload__button"
              onClick={() => inputRef.current?.click()}
            >
              Selecionar arquivo
            </button>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          className="resume-upload__input"
          accept={ALLOWED_RESUME_ACCEPT}
          aria-label="Currículo (PDF, DOC ou DOCX, máximo 5 MB)"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => {
            const selected = e.target.files?.[0];
            if (selected) onChange(selected);
          }}
        />
      </div>

      {error && (
        <span id={errorId} className="contact-form__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 15V4M12 4 7.5 8.5M12 4l4.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
