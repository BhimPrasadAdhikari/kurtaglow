import usePreviewModal from "@/hooks/use-preview-modal";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import Modal from "@/components/ui/modal";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className=" flex justify-between flex-wrap gap-2">
        <div className="">
          <Gallery images={product.images} />
        </div>
        <div className=" ">
          <Info
            data={product}
            productSpecification={[]}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
