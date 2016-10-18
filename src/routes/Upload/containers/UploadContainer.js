import { connect } from 'react-redux'
import UploadView from '../components/UploadView'
import { 
  createUpload,
  addAttachmentToUpload,
  publishUpload,
  getIsNewUploadBusy,
  resetNewUpload
} from '../modules/newUpload'

const mapStateToProps = state => {
  return {
    newUpload: state.newUpload,
    newUploadBusy: getIsNewUploadBusy(state)
  }
}
const mapActionsToProps = {
  createUpload, addAttachmentToUpload, publishUpload, resetNewUpload
}

export default connect(mapStateToProps, mapActionsToProps)(UploadView)
