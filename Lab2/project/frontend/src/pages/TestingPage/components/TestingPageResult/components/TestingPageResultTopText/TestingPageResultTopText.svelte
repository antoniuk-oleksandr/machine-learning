<script lang="ts">
  type TestingPageResultTopTextProps = {
    softmax: number[]
    predictedIndex: number
  }

  const { softmax, predictedIndex }: TestingPageResultTopTextProps = $props()
</script>

<div>
  <h3 class="text-lg font-medium text-gray-900">
    Predicted Number: <span class="font-bold text-primary-700">{predictedIndex}</span>
  </h3>
  <p class=" text-gray-500 dark:text-gray-400 mt-1">
    Confidence: {(Math.max(...softmax) * 100).toFixed(2)}%
  </p>
</div>
