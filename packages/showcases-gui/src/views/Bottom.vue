<script setup lang="ts">
import ActionButton from '@Showcases/GUI/components/ActionButton.vue';
import ValueBar from '@Showcases/GUI/components/ValueBar.vue';
import { useGuiButtonStore } from '@Showcases/GUI/stores/GuiButtonsStore';
import { vueTranslationService } from '@Showcases/i18n';
import { Heart, Sword, Zap } from 'lucide-vue-next';
import type { ShallowRef } from 'vue';
import { computed } from 'vue';

const { $t } = vueTranslationService;
const valueEnergyTitle: ShallowRef<string> = $t('gui.bottom.bar.energy.title');
const valueHealthTitle: ShallowRef<string> = $t('gui.bottom.bar.health.title');
const buttonAttackTitle: ShallowRef<string> = $t('gui.bottom.button.attack.title');

const buttons = computed(() => {
  return useGuiButtonStore()
    .buttonsList()
    .filter((button) => button.isVisible);
});
</script>

<template>
  <div class="bottom">
    <div class="panel -bottom">
      <div class="game-hud">
        <ValueBar :title="valueEnergyTitle" :current="75" :max="100" color="blue">
          <Zap />
        </ValueBar>

        <div class="action-buttons">
          <ActionButton v-for="button in buttons" :key="button.id" :title="buttonAttackTitle" :data-key="button.key">
            {{ button.title }}
            <Sword />
          </ActionButton>

          <!--          <ActionButton :title="buttonDefenseTitle" data-key="RMB">-->
          <!--            <Shield />-->
          <!--          </ActionButton>-->

          <!--          <ActionButton :title="buttonInventoryTitle" data-key="I">-->
          <!--            <Backpack />-->
          <!--          </ActionButton>-->

          <!--          <ActionButton :title="buttonMapTitle" data-key="M">-->
          <!--            <Map />-->
          <!--          </ActionButton>-->

          <!--          <ActionButton :title="buttonSettingsTitle" data-key="Esc">-->
          <!--            <Settings />-->
          <!--          </ActionButton>-->
        </div>

        <ValueBar :title="valueHealthTitle" :current="85" :max="100" color="red">
          <Heart />
        </ValueBar>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom {
  display: flex;
  min-width: 100%;
  min-height: 100%;
  align-items: center;
  flex-direction: column;
  gap: 14px;

  .panel {
    width: 100%;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: rgb(204 204 204 / 45%);
    pointer-events: auto;
    backdrop-filter: blur(2px);

    h1 {
      margin-bottom: 16px;
      font-size: 2em;
      color: #333333;
    }

    p {
      margin-bottom: 12px;
      font-size: 1.1em;
      color: #555555;
      line-height: 1.6;
    }

    &.-bottom {
      margin-top: auto;
    }
  }

  .game-hud {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .action-buttons {
      display: flex;
      gap: 0.75rem;
      padding-bottom: 0.5rem;
    }
  }
}
</style>
