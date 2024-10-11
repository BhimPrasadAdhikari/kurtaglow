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
  // Transform the specifications array into an array of objects
  const specificationsArray = product.productSpecification.map(
    (ps: { name: string; value: string }) => ({
      name: ps.name, 
      value: ps.value,
    })
  );
  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <div className=" flex justify-between flex-wrap gap-2">
        <div className="">
          <Gallery images={product.images} />
        </div>
        <div className=" ">
          <Info
            data={product}
            productSpecification={specificationsArray}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
