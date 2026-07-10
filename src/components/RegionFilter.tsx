import { REGIONS } from "../lib/plans";
import { useSelection } from "../context/SelectionContext";

interface RegionFilterProps {
  id?: string;
  className?: string;
  showHint?: boolean;
  /** Oculta a opção neutra “Selecione sua região” (ex.: seção de planos da home). */
  hideEmptyOption?: boolean;
}

export default function RegionFilter({
  id = "region-filter",
  className = "",
  showHint = true,
  hideEmptyOption = false,
}: RegionFilterProps) {
  const { regionId, setRegionId } = useSelection();

  return (
    <div className={`region-filter ${className}`.trim()}>
      <label className="region-filter__label" htmlFor={id}>
        Sua região
      </label>
      <div
        className="region-filter__options"
        role="radiogroup"
        aria-labelledby={`${id}-label`}
      >
        <span id={`${id}-label`} className="sr-only">
          Selecione sua região
        </span>
        {!hideEmptyOption && (
          <button
            type="button"
            role="radio"
            aria-checked={regionId === null}
            className={`region-filter__option ${regionId === null ? "region-filter__option--active" : ""}`}
            onClick={() => setRegionId(null)}
          >
            Selecione sua região
          </button>
        )}
        {REGIONS.map((region) => (
          <button
            key={region.id}
            type="button"
            role="radio"
            aria-checked={regionId === region.id}
            className={`region-filter__option ${regionId === region.id ? "region-filter__option--active" : ""}`}
            onClick={() => setRegionId(region.id)}
          >
            {region.name}
          </button>
        ))}
      </div>
      {showHint && !hideEmptyOption && regionId === null && (
        <p className="region-filter__hint" id={`${id}-hint`}>
          Escolha sua região para ver os planos disponíveis na sua área.
        </p>
      )}
    </div>
  );
}
