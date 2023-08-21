import { ecs7EnsureEntity } from '../ecs7/ECS7'
import { ECS6State } from '../types'

import { Material } from '@dcl/ecs'
import { convertTexture } from './commons/utils'

export function update(state: ECS6State, ecs6EntityId: EntityID, payload: any) {
  const ecs7Entity = ecs7EnsureEntity(state, ecs6EntityId)
  Material.setBasicMaterial(ecs7Entity, {
    texture: convertTexture(state, payload.albedoTexture),
    alphaTest: payload.alphaTest,
    castShadows: payload.castShadows,
  })
}

export function remove(state: ECS6State, ecs6EntityId: EntityID) {
  const ecs7Entity = ecs7EnsureEntity(state, ecs6EntityId)
  if (Material.getOrNull(ecs7Entity)) {
    Material.deleteFrom(ecs7Entity)
  }
}
