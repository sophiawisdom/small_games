import esprima

def get_literals(js):
    if getattr(js, 'type') == "Literal": return [js]
    literals = []
    for key, value in js.items():
        if key in ("range", "loc", "type"):
            continue
        if issubclass(type(value), esprima.nodes.Node):
            if value.type == "Literal":
                literals.append(value)
            else:
                literals.extend(get_literals(value))
        elif issubclass(type(value), list):
            for subexpr in value:
                literals.extend(get_literals(subexpr))
        else:
            pass
            # print("got unknown value", value)
    return literals


def literal_value_variable(literal_expr):
    return literal_expr.value not in (1920, 1080, 0, 1)

def group_literals(literals):
    letter = ord('a')
    values = {}
    for literal in literals:
        if literal.value in values:
            literal.key = values[literal.value]
        else:
            literal.key = chr(letter)
            values[literal.value] = chr(letter)
            letter += 1
    return literals


def franken_string(orig_string, literals):
    curr_str = ''
    curr_index = 0
    for literal in literals:
        curr_str += orig_string[curr_index:literal.range[0]]
        curr_str += f"(variables.{literal.key})"
        curr_index = literal.range[1]
    
    return curr_str + orig_string[curr_index:]

def config_literals(literals):
    seen_keys = set()
    config_lits = []
    for literal in literals:
        if literal.key not in seen_keys:
            seen_keys.add(literal.key)
            config_lits.append({"default": literal.value,
            "key": literal.key,
            "description": f'Variable {literal.key}'})

    return config_lits

def get_literals_and_transform_string(orig_javascript):
    parsed = esprima.parseScript(orig_javascript, options={"range": True})
    literals = get_literals(parsed)
    filtered_literals = list(filter(literal_value_variable, literals))
    group_literals(filtered_literals)

    return franken_string(orig_javascript, filtered_literals), config_literals(filtered_literals)
