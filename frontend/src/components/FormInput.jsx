export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  as: Component = 'input',
  children,
  ...props
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <Component
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary-500 ${
          error ? 'border-red-400' : 'border-slate-300'
        }`}
        {...props}
      >
        {children}
      </Component>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
