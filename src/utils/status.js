export const statusColor = (status) => {
  switch (status) {
    case "accepted":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "revised":
      return "text-blue-600";
    case "resubmitted":
      return "text-blue-600";
    case "cancelled":
      return "text-orange-600";
    default:
      return "text-gray-500";
  }
};

export function formatStatus(status) {
  switch (status) {
    case "submitted":
      return "Menunggu Verifikasi";
    case "accepted":
      return "Diterima";
    case "rejected":
      return "Ditolak";
    case "revised":
      return "Perlu Revisi";
    case "cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
}
