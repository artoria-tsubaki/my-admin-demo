import olMap, { MapOptions } from 'ol/Map'
import { ref } from 'vue'

export default class KrnMap {
  target: olMap;
  public constructor(config: MapOptions) {
    // 实例化地图对象
    this.target = this._initMap(config)
  }

  _initMap(config : MapOptions) {
    return new olMap(config)
  }
}