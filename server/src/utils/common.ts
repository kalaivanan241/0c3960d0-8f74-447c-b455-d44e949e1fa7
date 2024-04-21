export function dateDifferenceInMonths(
  dateInitial: Date,
  dateFinal: Date
): number {
  return Math.max(
    (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
      dateFinal.getMonth() -
      dateInitial.getMonth(),
    0
  );
}
