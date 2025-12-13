<script setup lang="ts">
import ActionButton from '@Showcases/GUI/components/ActionButton.vue';
import ValueBar from '@Showcases/GUI/components/ValueBar.vue';
import { useGuiButtonStore } from '@Showcases/GUI/stores/GuiButtonsStore';
import { ShowcasesLocales, vueTranslationService } from '@Showcases/i18n';
import { Heart, Zap } from 'lucide-vue-next';

const buttons = useGuiButtonStore()
  .buttonsList()
  .filter((button) => button.isVisible);

function toggleLocale(): void {
  const newLocale = vueTranslationService.getCurrentLocale().id === ShowcasesLocales['en-US'].id ? ShowcasesLocales['nl-NL'] : ShowcasesLocales['en-US'];
  vueTranslationService.setLocale(newLocale);
}
</script>

<template>
  <div class="bottom">
    <div class="panel -bottom">
      <div class="game-hud">
        <ValueBar :title="$t('gui.bottom.bar.energy.title')" :current="75" :max="100" color="blue">
          <Zap />
        </ValueBar>

        <div class="action-buttons">
          <!-- //TODO DEBUG -->
          <div v-for="button in useGuiButtonStore().buttonsList()" :key="button.id">{{ button.isActive }}</div>
          <div @click="toggleLocale()">toggle</div>

          <ActionButton v-for="button in buttons" :key="button.id" :title="$t(button.i18n)" :is-active="button.isActive" :data-key="button.key">
            <component :is="button.icon" />
          </ActionButton>
        </div>

        <ValueBar :title="$t('gui.bottom.bar.health.title')" :current="85" :max="100" color="red">
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
