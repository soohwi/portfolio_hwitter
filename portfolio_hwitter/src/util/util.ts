export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  onFileLoad: (fileData: string) => void
) => {
  const { files } = e.target;

  if (files && files.length === 1) {
    if (files[0].size < 1*1024*1024) {// 1mb이하만 업로드
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        console.log("File data encoded: ", result);// 확인 로그 추가
        onFileLoad(result);// file 데이터를 콜백으로 전달
      }

      reader.readAsDataURL(files[0]);
    }
  }
};