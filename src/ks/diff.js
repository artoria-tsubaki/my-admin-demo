/**
 * diff算法基于虚拟DOM树的比较，通过比较前后两个虚拟DOM树的差异，最终只对差异部分进行实际的DOM操作，从而提高性能。
 * 具体实现原理是通过深度优先遍历两个虚拟DOM树，对比同一层级的节点，如果节点类型不同，则直接替换；如果节点类型相同，则比较属性和子节点，如果有差异则更新。
 */

