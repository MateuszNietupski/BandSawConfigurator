
export function compatibleMachineIds(blade, machines) {
  return machines
    .filter(
      (m) =>
        m.length === blade.Length &&
        m.width === blade.Width &&
        m.thickness === blade.Thickness
    )
    .map((m) => m.id);
}