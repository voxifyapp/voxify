import Config from 'react-native-config';

export class Constants {
  static readonly VOXIFY_API_ENDPOINT = Config.VOXIFY_API_ENDPOINT;
  static readonly ACTIVITY_VIDEO_URL = Config.ACTIVITY_VIDEO_URL;

  static readonly SHOW_DEBUG_TOOLS = Config.SHOW_DEBUG_TOOLS === 'true';
}
