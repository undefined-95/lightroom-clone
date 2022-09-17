const Image = ({ src, alt }) => {
  return src && alt ? (
    <img src={src} alt={alt} className="icon-slideBar" />
  ) : (
    <>
      <img
        src={'https://img.icons8.com/ios-filled/344/error-cloud--v1.png'}
        alt={'Иконка бита'}
        className="icon-slideBar"
      />
    </>
  )
}
export default Image
