export function partial1<T1, T2, TOut>(
  func: (t1: T1, t2: T2) => TOut
): (t1: T1) => (t2: T2) => TOut {
  return (t1: T1) => func.bind(null, t1);
}

export function partial2<T1, T2, T3, TOut>(
  func: (t1: T1, t2: T2, t3: T3) => TOut
): (t1: T1, t2: T2) => (t3: T3) => TOut {
  return (t1: T1, t2: T2) => func.bind(null, t1, t2);
}

export function partial3<T1, T2, T3, T4, TOut>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4) => TOut
): (t1: T1, t2: T2, t3: T3) => (t4: T4) => TOut {
  return (t1: T1, t2: T2, t3: T3) => func.bind(null, t1, t2, t3);
}

export function partial4<T1, T2, T3, T4, T5, TOut>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => TOut
): (t1: T1, t2: T2, t3: T3, t4: T4) => (t5: T5) => TOut {
  return (t1: T1, t2: T2, t3: T3, t4: T4) => func.bind(null, t1, t2, t3, t4);
}

export function partial5<T1, T2, T3, T4, T5, T6, TOut>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => TOut
): (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => (t6: T6) => TOut {
  return (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) =>
    func.bind(null, t1, t2, t3, t4, t5);
}

export function partial6<T1, T2, T3, T4, T5, T6, T7, TOut>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) => TOut
): (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) => (t7: T7) => TOut {
  return (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6) =>
    func.bind(null, t1, t2, t3, t4, t5, t6);
}

export function partial7<T1, T2, T3, T4, T5, T6, T7, T8, TOut>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8) => TOut
): (
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7
) => (t8: T8) => TOut {
  return (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7) =>
    func.bind(null, t1, t2, t3, t4, t5, t6, t7);
}

export function partial8<T1, T2, T3, T4, T5, T6, T7, T8, T9, TOut>(
  func: (
    t1: T1,
    t2: T2,
    t3: T3,
    t4: T4,
    t5: T5,
    t6: T6,
    t7: T7,
    t8: T8,
    t9: T9
  ) => TOut
): (
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
  t5: T5,
  t6: T6,
  t7: T7,
  t8: T8
) => (t9: T9) => TOut {
  return (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6, t7: T7, t8: T8) =>
    func.bind(null, t1, t2, t3, t4, t5, t6, t7, t8);
}
