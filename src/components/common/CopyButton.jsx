import useClipboard from '../../hooks/useClipboard';

function CopyButton({
  toastIdentifier = '',
  contentToCopy,
  enableToast = false,
  enableTimeout = true
}) {
  const [copied, handleItemCopy] = useClipboard();
  return (
    <button
      onClick={() => handleItemCopy(toastIdentifier, contentToCopy, enableToast, enableTimeout)}
      className={`flex w-20 items-center justify-center ${copied ? 'bg-green-600' : 'bg-blue-600'} text-md gap-1  rounded-md p-1 font-semibold transition-all duration-200 lg:text-lg ${!copied && 'hover:bg-blue-700'}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default CopyButton;
