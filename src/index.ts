import { TextDecoder } from "text-encoding"
import { readFile } from "~system/Runtime"
import { customEval } from "./sandbox"
import { AdaptionLayer } from "./runtime/DecentralandInterface"

async function getSceneJsonData(fileName: string): Promise<any> {
  const res = await readFile({ fileName })
  var content = new TextDecoder().decode(res.content)
  return JSON.parse(content) as any
}

async function getSceneCode(): Promise<{ code: string, developerMode: boolean }> {
  const sceneJson = await getSceneJsonData('scene.json')

  // If the runtimeVersion is SDK7, it means that we're developing
  // otherwise, it means that we're injecting the code on top of a SDK6 Scene (prod)
  const developerMode = sceneJson.runtimeVersion === '7'
  let fileName: string = ''
  if (developerMode) {
    console.log('SDK7 Adaption Layer - Developer Mode')
    const devSceneJson = await getSceneJsonData('sdk6-tests/scene.json')
    fileName = `sdk6-tests/${devSceneJson.main}`
  } else {
    fileName = sceneJson.main
  }

  const res = await readFile({ fileName })
  return {
    code: new TextDecoder().decode(res.content),
    developerMode
  }
}

export async function main() {
  const { code, developerMode } = await getSceneCode()

  const adaptionLayer = AdaptionLayer.createAdaptionLayer(developerMode)
  await customEval(code, { dcl: adaptionLayer.decentralandInterface })

  adaptionLayer.forceUpdate(0.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
  adaptionLayer.forceUpdate(30.0)
}
