import Swal from 'sweetalert2';

export const confirmAction = async ({
  title = 'Are you sure?',
  text = 'This action cannot be undone.',
  confirmText = 'Yes',
  icon = 'warning',
}) => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#64748b',
    confirmButtonText: confirmText,
  });
  return result.isConfirmed;
};

export const confirmLogout = () =>
  confirmAction({
    title: 'Log out?',
    text: 'You will need to sign in again.',
    confirmText: 'Log out',
    icon: 'question',
  });
